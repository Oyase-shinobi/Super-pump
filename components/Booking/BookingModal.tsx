import React from 'react';
import { Modal, Form, Input, Row, Col, Button, DatePicker, message } from 'antd';
import { Billboard } from '@/lib/type';
import dayjs from "dayjs";
import { useAccount, useChainId, useWriteContract } from "wagmi";
import {
  CONTRACT_NFT_ADDRESS_MOONBEAM,
  BLOCK_EXPLORER_MOONBEAM,
  BLOCK_EXPLORER_BAOBAB,
  CHAINID,
 
} from "@/components/contract";
import { tokenAbi } from "@/components/token-abi";
interface TokenModalProps {
  isVisible: boolean;
  onCancel: () => void;
}
const { RangePicker } = DatePicker;

const TokenModal: React.FC<TokenModalProps> = ({ isVisible, onCancel }) => {
  const account = useAccount();
  const { writeContract } = useWriteContract();

  const onSubmit = async (values: any) => {
    if (account.address) {
      await writeContract({
        abi: tokenAbi,
        address: CONTRACT_NFT_ADDRESS_MOONBEAM, // You'll need to define this
        functionName: "deployERC20Token",
        args: [
          values.tokenName,
          values.tokenSymbol
        ],
        value: BigInt(10000000000000000) // 0.01 ETH as shown in your cast command
      });
      
      message.success("Token deployed successfully");
      onCancel();
    }
  };

  return (
    <Modal
      title="Deploy New Token"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      width={500}
      className="custom-modal"
    >
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Token Name"
          name="tokenName"
          rules={[{ required: true, message: 'Please input token name!' }]}
        >
          <Input placeholder="Enter token name" />
        </Form.Item>
        
        <Form.Item
          label="Token Symbol"
          name="tokenSymbol"
          rules={[{ required: true, message: 'Please input token symbol!' }]}
        >
          <Input placeholder="Enter token symbol" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Deploy Token
        </Button>
      </Form>
    </Modal>
  );
};

export default TokenModal;
